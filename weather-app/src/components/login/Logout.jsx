import { useNavigate } from "react-router-dom";

export function LogOutAction() {
  const navigate = useNavigate();

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");


  navigate('/');
  

  return null;
}
