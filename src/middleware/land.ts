import {Request, Response, NextFunction} from 'express'

class landMiddleware{
    async midGetX(req: Request, res: Response, next: NextFunction){
        if(req.body.x == null || req.body.x == ""){
          res.send("null X");
        } else
        if(req.body.x > 20 || req.body.x < -20){
          res.send("over X");
        }
        next();
      }
      async midGetY(req: Request, res: Response, next: NextFunction){
        if(req.body.y == null || req.body.y == ""){
          res.send("null Y");
        } else 
        if(req.body.y > 20 || req.body.y < -20){
          res.send("over Y")
        }
        next();
      }
}
export default new landMiddleware 