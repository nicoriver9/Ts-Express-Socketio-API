import { Request, Response } from 'express';

class IndexController {

    public index (req: Request, res: Response) {
        res.render('index', { 
            title: 'Welcome to Books App',
            host: 'http://localhost:3000'
        });        
    }

}

export const indexController = new IndexController();