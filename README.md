[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

O RestaurantApi é um programa que permite o gerenciamento de cardápios, de modo que o cliente pode escolher como montar o seu hambúrguer, acrescentar ou remover ingredientes e aproveitar promoções que garantem a satisfação do consumidor.

# Metodologia de Trabalho

A metodologia de trabalho foi baseada no DDD (Domain Driven Design) e no TDD (Test Driven Development). 
A primeira metodologia tem como intuito separar as partes do programa em unidades de domínio que são expressivas para o negócio que estamos tratando.
A segunda metodologia foi utilizada para construir os testes antes mesmo de existirem as classes, o que ajudou muito na formatação e consciência do que as classes deveriam ter e fazer, assim como ajudou a pensar em como implementá-las.
A documentação do modelo das classes foi realizada de forma não muito abrangente para não dispender de muito tempo. Isso foi feito pensando em uma das frases da metodologia Agile, que defende que se deve valorizar mais o funcionamento do código do que a documentação abrangente. 

> Software em funcionamento mais que documentação abrangente
"Mesmo havendo valor nos itens à direita,
valorizamos mais os itens à esquerda."

# Design do Código

O design do projeto foi realizado de forma escrita em uma lousa branca, uma vez que o desenho na lousa é mais rápido do que o uso de um software para design. Além disso, o desenho permitiu a realização de um plano anterior à realização do código, o que precedeu o uso do TDD para o desenvolvimento do código.

Esse desenho ilustra os diferentes domínios presentes no projeto. Esses domínios são: Business, Sales e Business e serão apresentados a seguir.

### Business

Esse domínio tem como "Aggregate Root" a classe CheckoutManager, que contém uma coleção de dados chamada menuItens do tipo MenuItem[] e outra chamada availableSales do tipo Sale[]. Abaixo deles, há os métodos addMenuItem() e RemoveMenuItem(), de modo que a partir dessa classe seja possível gerenciar o preço final dos produtos. 

O domínio Business está conecado com o dominio Products e Sales para que seja possível o gerenciamento do negócio do cliente.
Todas as regras do negócio do cliente estarão presentes nesse domínio, e a princípio ficarão todas no CheckoutManager.
Essa classe poderá, no futuro, conter outras classes de gerenciamento conforme as necessidades do cliente aumentem e as regras de negócio se expandam.

### Products

Esse domínio será dividido, inicialmente, em duas classes. A classe Ingredient, que é composta pelo name e o price dos ingredientes, e MenuItem, que é composta pelo name e ingredients(do tipo Ingredient[]), ou seja, a classe MenuItem contém a classe Ingredient e servirá como "Aggregate Root" inicialmente.

### Sales 

Esse domínio é dividido em várias classes. A primeira delas é a Sale, que é abstrata e apresenta as características de name e isActive e o método _isParticipating(). 

A classe Sale é a classe "pai" e "Aggregate Root" do domínio. 
Segundo as opções do restaurante, o cliente pode obter itens grátis, a partir de determinada promoção. Essa classe se chamará FreeIngredientSale, e é caracterizada por ter um name, isActive e _isParticipating(), assim como a classe Sale. Ela também contém um método chamado getFreeIngredient().
A partir do conceito de FreeIngredientSale, é possível nomear uma nova classe, LotsOfMeat, que tem as mesmas características da FreeIngredientSale e implementa o método getFreeIngredients() e fará toda a lógica necessária para retornar os ingredientes grátis da compra ou um array vazio no caso de nenhum ingrediente grátis.No caso da LotsOfMeat na compra de três porções de carne, o cliente só pagará duas, na compra de 6 pagará 4, e assim por diante.
Essa lógica ajudará o CheckoutManager a decidir quanto desconto dar em uma compra.
Essas características também serão utilizadas para o desenvolvimento da promoção de queijo, LotsOfCheese.

A classe PercentageSale tem as mesmas características da Sale, ou seja, name, isActive e o médodo _isParticipating(). Por outro lado, ela tem o método getDiscount(). Um exemplo de PercentageSale é a promoção Light, que se o lanche não tem bacon, mas tem alface, o consumidor ganha 10% de desconto.
A partir dessa estrutura inicial é possível representar essa lógica e denominá-la LightSale, que apresenta as mesmas características da PercentageSale, além de implementar a lógica própria de 10% de desconto. 

# Idioma

A língua inglesa foi utilizada para representar o domínio porque essa startup pode crescer e se expandir para o plano internacional, de modo que se torna necessário o uso de uma linguagem ubíqua, assim, todos podem se comunicar de maneira universal. 

### Instalação

RestaurantApi requer [Node.js] v11.1+ para iniciar. Favor fazer download e instalação do mesmo antes de prosseguir(https://nodejs.org/).

Instalar as Dependências e Dependências de Desenvolvimento para iniciar a api

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