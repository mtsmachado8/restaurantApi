[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

The BurguerProgram é um programa que permite o gerenciamento de cardápios, de modo que o cliente pode escolher como montar o seu hambúrguer, acrescentar ou remover ingredientes e aproveitar promoções que garantem a satisfação do consumidor.

# Metodologia de Trabalho

A metodologia do trabalho foi baseada na metodologia DDD (Domain Driven Design) e na TDD (Test Driven Design). A primeira metodologia tem como intuito separar as partes do programa em unidades de domínio, que são expressivas para o negócio que estamos tratando. A segunda metodologia foi utilizada para realizar os testes antes mesmo de existir as classes, o que foi possível devido à metodologia Agile, que defende que se deve valorizar mais o funcionamento do código do que a documentação abrangente. 

> Estamos descobrindo maneiras melhores de desenvolver 
software, fazendo-o nós mesmos e ajudando outros a 
fazerem o mesmo. Através deste trabalho, passamos a valorizar: 
Indivíduos e interações mais que processos e ferramentas
Software em funcionamento mais que documentação abrangente
Colaboração com o cliente mais que negociação de contratos
Responder a mudanças mais que seguir um plano
Ou seja, mesmo havendo valor nos itens à direita,
valorizamos mais os itens à esquerda.

# Design do Projeto

O design do projeto foi realizado de forma escrita em uma lousa branca, uma vez que o desenho na lousa é mais rápido do que o uso de um software para design. Além disso, o desenho permitiu a realização de um plano anterior à realização do código, o que possibilitou que por meio da metolologia TDD fossem realizados testes antes dos códigos.

Esse desenho ilustra os diferentes domínios presentes no projeto. Esses domínios são: Business, Sales e Business e serão apresentados a seguir.

### Business

Esse domínio é representado pelo Check Out Manager, que apresenta o Menu Item [] e o Available Sale []. Abaixo deles, há a opção de Add Menu Item () e de Remove Item (), de modo que a partir disso seja possível obter o preço final do produto. 

O domínio de Business está conecado com o dominio de Products e Sales, em uma proporção de 1:n.

### Products

Esse domínio é dividido em duas classes, Ingredient, que é composta pelo Name e o Price dos produtos, e Menu Item, que é composta pelo Name e Ingredient [], de modo que esse Ingredient é a classe Ingredient, ou seja, o Ingredient [] presente na classe Menu Item contém <> a classe Ingredient. 
Além disso, o que conecta a o domínio Business com o Products são o price (), Add Menu Item () e Remove Menu Item () presentes na classe do Menu Item. 

### Sales 

Esse domínio é dividido em várias classes. A primeira delas é a Sale, que é abstrata e apresenta as características de Name, Is Active e _Is Participating (). Ela se conecta com o domínio Business pelas características de Name e Is Active. 

Ademais, ela se conecta com as outras classes do mesmo domínio. Por exemplo, segundo as opções do restaurante, o cliente pode obter itens grátis, a partir de determinada promoção. Essa classe se chamará Free Ingredient Sale, e é caracterizada por ter um Name, Is Active e _Is Participating (), assim como a classe Sale. Entretanto, ela também tem uma característica própria que é Get Gree Ingredient (). A partir disso, é possível nomear uma nova classe, Lots of Meat, que tem as mesmas características da Free Ingredient Sale, além de ter uma característica própria, que é Get Free Meat, uma vez que na compra de três porções de carne, o cliente só para duas. Essas características também são adequadas para a promoção de queijo, Lots of Cheese, que tem uma característica própria de Get Gree Cheese. 

A classe Percentage Sale tem as mesmas características da Sale, ou seja, Name, Is Active e _Is Participating (). Por outro lado, ela tem outra característica própria, que é a Get Discount. Um exemplo disso é a promoção Light, que se o lanche não tem bacon, mas tem alface, o consumidor ganha 10% de desconto. A partir disso é possível ilustrar essa classe e denominá-la de Light Sale, que apresenta as mesmas características da Percentage Sale, além de apresentar uma característica própria de 10% de desconto. 

# Idioma

A língua inglesa utilizada para apresentar o domínio porque essa startup pode crescer e se expandir para o plano internacional, de modo que se torna necessário o uso de uma linguagem ubíqua, assim, todos podem se comunicar de maneira universal. 

FIZ ATÉ AQUI

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd dillinger
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```

### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| Github | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma test
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t joemccann/dillinger:${package.json.version} .
```
This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md