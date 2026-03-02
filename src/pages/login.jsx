import { Apple } from 'lucide-react';
import {Link} from "react-router-dom"
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="wrapper">

      <form className="login-box">

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">
          Please sign in to manage your appointments
        </p>

        <div className="user-type">
          <button type="button">Patient</button>
          <button type="button">Doctor</button>
          <button type="button">Admin</button>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="yourname@example.com"
            required
          />
        </div>

        <div className="input-group">
          <div className="password-header">
            <label htmlFor="password">Password</label>
            <a href="#" className="forgot">
              Forgot password?
            </a>
          </div>

          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>


        <div className="remember">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">
            Remember me for 30 days
          </label>
        </div>

       
        <button type="submit" className="btn-login">
          Sign In
        </button>

        
        <p className="divider">OR CONTINUE WITH</p>

        
        <div className="social-login">
         <Link to="#" className="google"><FcGoogle />Google</Link>
         <Link to="#" className="apple"><Apple />Apple</Link>
        </div>

        <section className="register">
        <p>
          Don’t have an account?
          <a href="#" className="create">
            Create Account
          </a>
        </p>
      </section>

      </form>

      

    </div>
  );
};

export default Login;



// const Login = () => {
//     return (
//         <>
//             <div class="wrapper">


//                 <form action="loginform" class="login box">
//                     <h2>Welcome Back</h2>
//                     <p>please sign in to manage your appoinment</p>

//                     <button type="button" class="btn-button">"patient" "doctor" "admin"</button>

//                     <div class="input-group">
//                         <label for="username">Email Address</label>
//                         <input type="text" id="username" placeholder="@ name@example.com" required />
//                     </div>


//                     <div class="input-group">
//                         <label for="username">password</label>    <Label>forget password?</Label>
//                         <input type="text" id="username" placeholder="........." required />
//                     </div>

//                     <p>Remember me for 30 days</p>

//                     <div class="button">
//                         <button type="submit">Sign In </button>
//                     </div>

//                     <p>OR CONTIUNE WITH</p>

//                     <div class="button">
//                         <a href="">google</a>
                        
//                     </div> 

//                     <div class="button">
//                         <a href="">Apple</a>
                        
//                     </div>

//                 </form>

//                 <section>
//                     <p>Don`t have an account? <h1>Create Account</h1></p>
//                 </section>

//             </div>

//         </>
//     )
// }

// export default Login