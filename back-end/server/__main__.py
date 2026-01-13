from server.routes.index import Routes
from server.config import Config
from server.extensions import mongo, jwt
from flask import Flask
from flask_cors import CORS

class Server:
  def __init__(self) -> None:
    self.app = Flask('__name__')
    CORS(self.app)
    self.routes()
  
  def config_dataBase(self) -> None:
    app = self.app
    app.config.from_object(Config)
    mongo.init_app(app)
    jwt.init_app(app)

  def start(self) -> None:
    print('Servidor iniciado com sucesso!')
    self.config_dataBase()
    self.app.run()

  def routes(self) -> None:
    self.route = Routes.Tests(self.app)


if __name__ == '__main__':
  server = Server()
  server.start()
