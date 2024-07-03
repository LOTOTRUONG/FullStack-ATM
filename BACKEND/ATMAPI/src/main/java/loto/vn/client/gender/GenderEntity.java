package loto.vn.client.gender;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "gender")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class GenderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_gender", unique = true)
    private Integer idGender;

    @Basic
    @Column(name = "name_gender")
    private String nameGender;
}
