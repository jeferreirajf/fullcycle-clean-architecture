# Desafio Clean Architecture Full Cycle

Neste repositório encontram-se os códigos relativos ao desafio do módulo de **Clean Architecture** do curso **Full Cycle**.

O desafio foi dividido em quatro sub desafios. Na primeira parte, foi necessário a criação dos **use cases** para a entidade **product** bem como os devidos testes unitários e de integração.

No segundo sub desafio, foi necessário a criação da de rotas, utilizando **Express** para a utilização dos **use cases** da entidade **product**. Dessa vez foram realizados testes **E2E**.

No terceiro sub desafio, foi necessário a adaptação da entidade **product** para utilizar o *pattern* ***Notification***. Além disso, os testes unitários foram devidamente criados.

No quarto sub desafio, 

## Sub Desafio 1

Neste sub desafio, os *use cases* **create**, **find**, **list** e **update** foram criados para a entidade **product**. Juntamente com eles, os devidos testes unitários e de integração também foram realizados.

## Sub Desafio 2

Neste sub desafio, as rotas de acesso para os serviços definidos pelos **use cases** da entidade **product** foram criadas utilizando **Express**. Quer dizer, para cada *use case* **create**, **find**, **list** e **update**, foi criado um respectivo **end point**. Além disso, foram realizados testes **E2E** para cada rota.

## Sub Desafio 3

Neste sub desafio, a entidade **product** foi alterada para a correta utilização do *pattern* ***notification***. Dentro das alterações, foram necessárias mudanças na herança da entidade, modificações no método de validação da entidade e também modificações para a correta utilização do campo **id** que agora se encontra na classe mãe.

Além disso, os testes foram corretamente modificados para comparar resultados de erro com os devidos resultados das classes de **notifications**.

## Sub Desafio 4

