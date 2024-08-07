package loto.vn.account;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class AccountCheckDTO {
    @JsonProperty(index = 1)
    private Integer idAccount;

    @JsonProperty(index = 2)
    private String phone;

    @JsonProperty(index = 3)
    private Float balanceAccount;
}
