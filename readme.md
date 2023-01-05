# Desafio Clean Architecture Full Cycle

Neste repositório encontram-se os códigos relativos ao desafio do módulo de **Clean Architecture** do curso **Full Cycle**.

O desafio foi dividido em quatro subdesafios. Na primeira parte, foi necessário a criação dos **use cases** para a entidade **product** bem como os devidos testes unitários e de integração.

No segundo subdesafio, foi necessário a criação da de rotas, utilizando **Express** para a utilização dos **use cases** da entidade **product**. Dessa vez foram realizados testes **E2E**.

No terceiro subdesafio, foi necessário a adaptação da entidade **product** para utilizar o *pattern* ***Notification***. Além disso, os testes unitários foram devidamente criados.

No quarto subdesafio, a utilização da biblioteca **yup** para validação das entidades foi implementada de maneira a diminuir o acoplamento da entidade de domínio e a biblioteca de validação.

## Subdesafio 1

Neste subdesafio, os *use cases* **create**, **find**, **list** e **update** foram criados para a entidade **product**. Juntamente com eles, os devidos testes unitários e de integração também foram realizados.

## Subdesafio 2

Neste subdesafio, as rotas de acesso para os serviços definidos pelos **use cases** da entidade **product** foram criadas utilizando **Express**. Quer dizer, para cada *use case* **create**, **find**, **list** e **update**, foi criado um respectivo **end point**. Além disso, foram realizados testes **E2E** para cada rota.

## Subdesafio 3

Neste subdesafio, a entidade **product** foi alterada para a correta utilização do *pattern* ***notification***. Dentro das alterações, foram necessárias mudanças na herança da entidade, modificações no método de validação da entidade e também modificações para a correta utilização do campo **id** que agora se encontra na classe mãe.

Além disso, os testes foram corretamente modificados para comparar resultados de erro com os devidos resultados das classes de **notifications**.

## Subdesafio 4

Neste subdesafio, a implementação da validação da entidade **product** foi realizada utilizando a biblioteca **yup**. A dificuldade do desafio encontra-se em minimizar o acoplamento do código da entidade com o código da validação. 

A ideia da solução consiste em criar uma interface com um atributo genérico para forçar o comportamento das classes validadoras concretas. Além disso, uma fábrica de validação também foi criada para inverter a dependência da entidade **product** no momento que ela se valida. Isso permitiu que a entidade não se preocupasse em como ela estava sendo validada mas em simplesmente chamar a sua prórpia validação.

Como complemento ao desafio, os testes anteriormente implementados foram verificados e nenhum foi quebrado.