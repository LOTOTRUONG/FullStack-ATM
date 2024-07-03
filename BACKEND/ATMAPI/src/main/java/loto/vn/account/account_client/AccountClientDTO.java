package loto.vn.account.account_client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import loto.vn.account.AccountEntity;
import loto.vn.client.ClientEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class AccountClientDTO {
    @JsonProperty(index = 1)
    private Integer idAccount;
    @JsonProperty(index = 2)
    private Integer idClient;
    @JsonProperty(index = 3)
    private Float balanceAmount;
    @JsonProperty(index = 4)
    private String nameClient;
    @JsonProperty(index = 5)
    private String accountNumber;

    public AccountClientDTO(ClientEntity client, AccountEntity account) {
        this.idClient = client.getIdClient();
        this.idAccount = account.getIdAccount();
    }

    public AccountClientDTO(AccountClientEntity accountClientEntity) {
        this.idAccount = accountClientEntity.getIdAccount();
        this.idClient = accountClientEntity.getIdClient();
        this.balanceAmount = accountClientEntity.getBalanceAccount();
        this.nameClient = accountClientEntity.getLastName() + " " + accountClientEntity.getFirstName();
        this.accountNumber = accountClientEntity.getAccountNumber();
    }

}
