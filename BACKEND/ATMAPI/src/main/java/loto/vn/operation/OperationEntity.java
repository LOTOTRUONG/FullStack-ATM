package loto.vn.operation;

import jakarta.persistence.*;
import lombok.*;
import loto.vn.account.AccountEntity;
import loto.vn.operation.type.TypeOperationEntity;

import java.sql.Date;

@Entity
@Table(name ="operation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class OperationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_operation")
    private Integer idOperation;

    @Basic
    @Column(name="date_operation")
    private Date dateOperation;

    @Basic
    @Column(name="amount")
    private Float amountOperation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_type")
    private TypeOperationEntity typeOperation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_account")
    private AccountEntity accountOperation;
}
