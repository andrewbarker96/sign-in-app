import { Device } from "@capacitor/device";
import { getAuth } from "firebase/auth";
import { anonLogin } from "./firestoreServices";
import jwt from "jsonwebtoken";

export const generateToken = async () => {
  const currentTime = Math.floor(Date.now() / 1000);
  const deviceInfo = await Device.getInfo();
  const expirationTime = currentTime + 3600; // 1 hour
  const privateKey = "private_key";
  const issuer = "https://signin.stockassoc.com";
  const claims = {
    sub: "public_key",
    exp: expirationTime,
  };

  const jwtToken = jwt.sign(claims, privateKey, { algorithm: "HS256" });
  console.log(jwtToken);
  return jwtToken;
};
