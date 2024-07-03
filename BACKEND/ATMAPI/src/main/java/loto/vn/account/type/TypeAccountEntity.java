package loto.vn.account.type;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name ="type_account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TypeAccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type")
    private Integer idType;

    @Basic
    @Column(name = "name_type")
    private String nameType;
}
