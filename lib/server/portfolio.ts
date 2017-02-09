import { Imgur } from '/server/main.config.ts'

class PortfolioLib {

   public setting() {
       const conf = Imgur
       console.log('from secret -> ' + conf.username)
       return conf 
   }
}

export const portfolioLib = new PortfolioLib()
