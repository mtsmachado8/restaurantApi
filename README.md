[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

O RestaurantApi é um programa que permite o gerenciamento de cardápios, de modo que o cliente pode escolher como montar o seu hambúrguer, acrescentar ou remover ingredientes e aproveitar promoções que garantem a satisfação do consumidor.

# Metodologia de Trabalho

   A metodologia de trabalho foi baseada no DDD (Domain Driven Design) e no TDD (Test Driven Development).

   A primeira metodologia tem como intuito separar as partes do programa em unidades de domínio que são expressivas para o negócio que estamos tratando.

   A segunda metodologia foi utilizada para construir os testes antes mesmo de existirem as classes, o que ajudou muito na formatação e consciência do que as classes deveriam ter e fazer, assim como ajudou a pensar em como implementá-las.

   A documentação do modelo das classes foi realizada de forma não muito abrangente para não dispender de muito tempo.
   
   Isso foi feito pensando em uma das frases da metodologia Agile, que defende que se deve valorizar mais o funcionamento do código do que a documentação abrangente. 

> Software em funcionamento mais que documentação abrangente

> "Mesmo havendo valor nos itens à direita, valorizamos mais os itens à esquerda."

# Design do Código

O design do projeto foi realizado de forma escrita em uma lousa branca, uma vez que o desenho na lousa é mais rápido do que o uso de um software para design.
Além disso, o desenho permitiu a realização de um plano anterior à escrita do código, o que ajudou no uso do TDD para o desenvolvimento dos testes e, por conseguinte, do código de produção.

Esse desenho ilustra os diferentes domínios presentes no projeto. Esses domínios são: Business, Sales e Product e serão apresentados a seguir.

![alt text](https://github.com/Mtsmachado8/restaurantApi/blob/master/model-design.jpeg)

### Business

Esse domínio tem como "Aggregate Root" a classe CheckoutManager, que contém uma coleção de dados chamada menuItens do tipo MenuItem[] e outra chamada availableSales do tipo Sale[]. nessa classe também estão presentes os métodos addMenuItem(), removeMenuItem() e price(), de modo que a partir dessa classe seja possível calcular o preço final dos produtos em tempo real.
Através dessa estratégia é possível aumentar ou diminuir o preço dos produtos a qualquer hora. O preço final será sempre calculado considerando o valor mais recente dos ingredientes.

O domínio Business está conectado com o dominio Products e Sales para que seja possível o gerenciamento do negócio do cliente.
Todas as regras do negócio do cliente estarão presentes nesse domínio, e a princípio ficarão todas no CheckoutManager.
Essa classe poderá, no futuro, conter outras classes de gerenciamento conforme a necessidade do cliente aumente e as regras de negócio se expandam.

### Products

Esse domínio será dividido, inicialmente, em duas classes.
A classe Ingredient, que é composta pelo name e price dos ingredientes, e a classe MenuItem, que é composta pelo name e ingredients(do tipo Ingredient[]), ou seja, a classe MenuItem contém a classe Ingredient e servirá como "Aggregate Root" inicialmente.

### Sales 

Esse domínio é dividido em várias classes. A primeira delas é a Sale, que é abstrata e apresenta as características de name, isActive e o método _isParticipating(). 

A classe Sale é a classe "pai" e "Aggregate Root" do domínio. 
Segundo os requisitos do restaurante, o cliente pode obter itens grátis, a partir de determinada promoção. A classe responsável por essa representar essa regra será a classe FreeIngredientSale, e é caracterizada por ter um name, isActive e o método _isParticipating(), assim como a classe Sale. Ela também contém um método chamado getFreeIngredients().
A partir do conceito de FreeIngredientSale, é possível nomear uma nova classe, LotsOfMeat, que tem as mesmas características da FreeIngredientSale e implementa o método getFreeIngredients().
O método getFreeIngredients() fará toda a lógica necessária para retornar os ingredientes grátis da compra ou um array vazio no caso de nenhum ingrediente grátis.
No caso da LotsOfMeat na compra de três porções de carne, o cliente só pagará duas, na compra de 6 pagará 4, e assim por diante.
Essas características também serão utilizadas para o desenvolvimento da promoção de queijo, LotsOfCheese.

A classe PercentageSale tem as mesmas características da Sale, ou seja, name, isActive e o médodo _isParticipating(). Por outro lado, ela tem o método getDiscount(). Um exemplo de PercentageSale é a promoção Light, que se o lanche não tem bacon, mas tem alface, o consumidor ganha 10% de desconto.
A partir dessa estrutura inicial é possível representar essa lógica e denominá-la LightSale, que apresenta as mesmas características da PercentageSale, além de implementar a lógica própria de 10% de desconto.

Essa essa estratégia do domínio ajudará o CheckoutManager a decidir quanto desconto dar em uma compra, assim como ajudará a diferenciar e gerenciar a concorrência entre as diferentes promoções existentes.
Através dessa representação do problema será possível, por exemplo, dar descontos cumulativos se o cliente está participando de mais de uma promoção.
Como alternativa também podemos, com pouca mudança no código, utilizar uma estratégia de maior desconto entre as promoções.

# Idioma

A língua inglesa foi utilizada para representar o domínio porque essa startup pode crescer e se expandir para o plano internacional, de modo que se torna necessário o uso de uma linguagem ubíqua, assim, todos podem se comunicar de maneira universal. 

### Instalação

RestaurantApi requer [Node.js] v10.15.3+ para iniciar.
Favor fazer download e instalação do mesmo antes de prosseguir (https://nodejs.org/).

Clonar o projeto em sua máquina local
```sh
$ git clone https://github.com/Mtsmachado8/restaurantApi.git
```

Instalar as Dependências e Dependências de Desenvolvimento e iniciar a api

```sh
$ cd restaurantApi
$ npm install
$ npm start
```

Para os testes automatizados...

```sh
$ npm run test
```

### TODO's

 - Escrever testes para os middlewares e outras partes da infra
 - Fazer os testes automatizados serem executados por algum modelo de integração contínua
 - Fazer ambiente de execução da aplicação possuir um HTTP Proxying com nginx, e redirecionar as requisições da porta 80 para o server-side
 - Fazer um ambiente virtualizado em Docker com scripts para execução

License
----

MIT