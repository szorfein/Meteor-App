import { Imgur } from '/server/main.config'

class PortfolioLib {

   public setting() {
       const conf = Imgur
       return conf 
   }
}

export const portfolioLib = new PortfolioLib()
