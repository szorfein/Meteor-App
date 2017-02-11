import { Imgur } from '/server/main.config'

class PortfolioLib {

   public setting() {
       const conf = Imgur
       return conf 
   }

   public add(linkForm : string) {
       console.log('linkform -> ' + linkForm)
   }
}

export const portfolioLib = new PortfolioLib()
