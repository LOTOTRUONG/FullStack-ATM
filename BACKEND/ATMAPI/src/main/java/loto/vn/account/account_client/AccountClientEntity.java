package loto.vn.account.account_client;

import jakarta.persistence.*;
import lombok.*;
import loto.vn.account.AccountEntity;
import loto.vn.client.ClientEntity;
import org.hibernate.annotations.Immutable;

import java.sql.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Immutable
@Table(name = "ViewAccountClient")

public class AccountClientEntity {
    @Id
    @Column(name = "id_account")
    private Integer idAccount;
    @Column(name = "account_number")
    private String accountNumber;
    @Column(name = "id_client")
    private Integer idClient;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name = "name_gender")
    private String gender;
    @Column(name = "phone")
    private String phone;
    @Column(name = "address")
    private String address;
    @Column(name = "code")
    private String code;
    @Column(name = "dob")
    private Date dob;
    @Column(name = "balanceAccount")
    private Float balanceAccount;

    public String getAccountNumber() {
        if (accountNumber != null && accountNumber.length() > 3) {
            StringBuilder maskedNumber = new StringBuilder();
            for (int i = 0; i < accountNumber.length() - 3; i++) {
                maskedNumber.append('*');
            }
            maskedNumber.append(accountNumber.substring(accountNumber.length() - 3));
            return maskedNumber.toString();
        }
        return accountNumber;
    }

}
