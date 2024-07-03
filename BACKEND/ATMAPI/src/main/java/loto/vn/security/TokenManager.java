package loto.vn.security;
import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Singleton;

@Singleton
public class TokenManager {
   public static String generateToken(String login)  {
       return Jwt.issuer("jwt-token")
               .subject(login)
               .expiresIn(60*60*1)
               .sign();
   }
}
