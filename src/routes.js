import { Router } from 'express';

const routes = new Router();

routes.get('/',(req,res)=>{
    res.json({ok:"deu bom"})
})


export default routes;
