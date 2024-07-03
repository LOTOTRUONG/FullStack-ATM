package loto.vn.card.status;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name ="type_card")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TypeCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type")
    private Integer idType;

    @Basic
    @Column(name = "name_type")
    private String nameType;
}
