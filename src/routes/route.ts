import cors from 'cors'
import route2 from './land' 
import router1 from './user';
import app from "../app";
function route(){
    app.use('/land', cors(), route2);
    app.use('/user', cors(), router1);
}

export default route;