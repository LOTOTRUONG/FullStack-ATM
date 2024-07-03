package loto.vn.account;

import jakarta.persistence.*;
import lombok.*;
import loto.vn.agent.AgentEntity;
import loto.vn.account.type.TypeAccountEntity;

import java.sql.Date;

@Entity
@Table(name = "account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class AccountEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_account")
    private Integer idAccount;

    @Basic
    @Column(name = "account_number", unique = true)
    private String accountNumber;

    @Basic
    @Column(name = "date_open")
    private Date dateOpen;

    @Basic
    @Column(name = "IBAN")
    private String iban;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_type")
    private TypeAccountEntity typeAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_agent")
    private AgentEntity agent;

    public AccountEntity(Integer idAccount){
        this.idAccount = idAccount;
    }
}
