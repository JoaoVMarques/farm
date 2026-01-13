from school.extensions import mongo

class Accounts_model:
  def __init__(self, account) -> None:
    self.account = account
  
  async def findByEmail(self, email):
    accounts_collection = mongo.db.accounts
    return accounts_collection.find_one({ "email": email })