import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
function ProtectedRoute({element}){
    const jwtToken=Cookies.get('jwt_token');
    if(jwtToken===undefined){
        return <Navigate to="/login"/>
    }
    else{
        return element;
    }
}
export default ProtectedRoute;