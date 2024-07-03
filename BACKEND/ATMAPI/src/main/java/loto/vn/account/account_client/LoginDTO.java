package loto.vn.account.account_client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class LoginDTO {
    @JsonProperty(index = 1)
    private String login;
    @JsonProperty(index = 2)
    private String code;
}
