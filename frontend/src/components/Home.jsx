import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="home">
            <section className="home__welcome">
                  <h3>welcome</h3>
           <Link to={"/login"}>Login</Link>
           <Link to={"/register"}>Register</Link>
            </section>
          
        </main>
    );
}