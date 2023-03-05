import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../pages/signin.sass";

export default function SignIn() {
  const [value, setValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setFormValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
    },
  });
  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername } = useContext(UserContext);
  const isDisabled = value.length < 4 || value.length > 16;

  useEffect(() => {
    localStorage.removeItem("username");
  }, []);

  const onSubmit = (data) => {
    setUsername(data.username);
    setIsLoggedIn(true);
    localStorage.setItem("username", data.username);
    navigate("/");
  };

  return (
    <div className="profile">
      <div className="profile-img"></div>
      <div className="profile-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-box">
            <input
              type="text"
              {...register("username", {
                required: "enter username",
                pattern: {
                  value: /^[A-Za-z0-9_]{4,16}$/,
                  message:
                    "enter English letters, but you cannot enter a space",
                },
                minLength: {
                  value: 4,
                  message: "username should have at least 4 characters",
                },
                maxLength: {
                  value: 16,
                  message: "username should have at most 16 characters",
                },
              })}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setFormValue("username", e.target.value, {
                  shouldValidate: true,
                });
              }}
            />
            <label className="label">Username</label>
          </div>
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}

          <button className="profile__btn" type="submit" disabled={isDisabled}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {isDisabled ? "Sign-Out" : "Sign-In"}
          </button>
        </form>
      </div>
    </div>
  );
}
