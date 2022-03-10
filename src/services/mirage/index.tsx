import { createServer, Factory, Model, Response, ActiveModelSerializer } from "miragejs";
import faker from "faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      //os models são como tabelas de um banco de dados
      user: Model.extend<Partial<User>>({}), //o "Partial" faz o papel de evitar que se tenha erro por não está utilizando todas as props informadas
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    //gerar 200 dados referente a tabela user
    seeds(server) {
      server.createList("user", 200);
    },

    //routes é o sistema de rotas que o MirageJS providencia para simular um sistema de rotas de um
    //backend tradicional
    routes() {
      //para que as rotas sejam chamadas de forma correta é necessário definir um "namespace"
      //nesse caso é "api"
      //http://api/users
      this.namespace = "api";

      //timing vai fazer com que todas as chamadas que forem feita para o backend demore
      //750 milissegundos para acontecer
      //é uma prática boa para fazer testes em loads da aplicação e simular uma chamada real fora do localhost
      this.timing = 750;

      //verbos https para listagem e criação
      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        //pegar o total de registros existentes
        const total = schema.all("user").length;

        //a página selecionada * a quantidade de registro por página vai te dar o valor que a página vai iniciar
        //é necessário colocar o -1 em page para que o registro comece na página 0 e não na 10
        const pageStart = (Number(page) - 1) * Number(per_page);

        //página inicial + quantidade de registro por página vai ter dar qual será o valor do último registro da página
        const pageEnd = Number(pageStart) + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(
          200, //número de registros,
          { "x-total-count": String(total) }, //número total de registros que foram buscados
          { users } //listagem de usuários da página específica
        );
      });
      this.get("/users/:id");
      this.post("/users");

      //para não interferir no sistema de rotas que o Next tem dentro de sua pasta "pages/api"
      //é necessário alterar o namespace para outra coisa ou limpar o namespace depois que a rota foi chamada
      this.namespace = "";

      //o método passthrough vai fazer com que todas as chamadas que possui "api" seja detectada
      //pelas rotas do Mirage, e caso não seje detectada, isso fará com que passe adiante caso
      //exista outra função, outra rota que tenha "api", e ela possa funcionar sem interferência
      this.passthrough();
    },
  });

  return server;
}
