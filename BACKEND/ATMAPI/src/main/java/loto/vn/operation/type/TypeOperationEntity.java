package loto.vn.operation.type;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name ="type_operation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TypeOperationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type")
    private Integer idType;

    @Basic
    @Column(name = "name_type")
    private String nameType;

    public TypeOperationEntity(Integer idType){
        this.idType = idType;
    }
}
