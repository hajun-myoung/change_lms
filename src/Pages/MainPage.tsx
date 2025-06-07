import { useAuth } from "../Contexts/AuthContexts";

export default function MainPage() {
  const { user } = useAuth();
  console.log(user);
  return <>This is Main Page</>;
}
