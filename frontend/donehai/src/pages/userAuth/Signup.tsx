
import { useState } from "react";
import { BottomWarning } from "../../components/BottomWarning";
import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { InputBox } from "../../components/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const [name, Setname] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-gray-900 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-xl">
            <Heading label={"Sign up"} />
            <InputBox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                Setname(e.target.value);
              }}
              placeholder="abc"
              label={"Your Name"}
            />
            <InputBox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                SetEmail(e.target.value);
              }}
              placeholder="abc@gmail.com"
              label={"Email"}
            />
            <InputBox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                SetPassword(e.target.value);
              }}
              placeholder="password"
              label={"Password"}
            />
            <div className="pt-4">
              <Button
                onClick={async () => {
                  const response = await axios.post(
                    "http://localhost:5000/user/signup",
                    {
                      email: email,
                      name: name,
                      password: password,
                    }
                  );
                  localStorage.setItem("UserToken", response.data.token);
                  navigate("/home");
                }}
                label={"Sign up"}
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Login"}
              to={"/login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};