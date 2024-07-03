package loto.vn.client;

import jakarta.persistence.*;
import lombok.*;
import loto.vn.city.CityEntity;
import loto.vn.country.CountryEntity;
import loto.vn.client.gender.GenderEntity;

import java.sql.Date;

@Entity
@Table(name = "client")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ClientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client", unique = true)
    private Integer idClient;

    @Basic
    @Column(name = "phone", unique = true)
    private String phone;

    @Basic
    @Column(name = "lastname")
    private String lastName;

    @Basic
    @Column(name = "firstname")
    private String firstName;

    @Basic
    @Column(name = "code")
    private String code;

    @Basic
    @Column(name = "dob")
    private Date dob;

    @Basic
    @Column(name = "email", unique = true)
    private String email;

    @Basic
    @Column(name = "address")
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_gender")
    private GenderEntity gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_city")
    private CityEntity city;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_country")
    private CountryEntity country;
}
