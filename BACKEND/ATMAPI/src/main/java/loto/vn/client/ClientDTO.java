package loto.vn.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ClientDTO {
    @JsonProperty(index = 1)
    private Integer idClient;
    @JsonProperty(index = 2)
    private String phone;
    @JsonProperty(index = 3)
    private String code;
    @JsonProperty(index = 4)
    private String lastname;
    @JsonProperty(index = 5)
    private String firstname;
    @JsonProperty(index = 6)
    private String email;
    @JsonProperty(index = 7)
    private String gender;
    @JsonProperty(index = 8)
    private Date dob;
    @JsonProperty(index = 9)
    private String city;
    @JsonProperty(index = 10)
    private String country;

    public ClientDTO(ClientEntity clientEntity){
        this.idClient = clientEntity.getIdClient();
        this.phone = clientEntity.getPhone();
        this.code = clientEntity.getCode();
        this.lastname = clientEntity.getLastName();
        this.firstname = clientEntity.getFirstName();
        this.email = clientEntity.getEmail();
        this.gender = clientEntity.getGender().getNameGender();
        this.dob = clientEntity.getDob();
        this.city = clientEntity.getCity().getNameCity();
        this.country = clientEntity.getCountry().getNameCountry();
    }

    public static List<ClientDTO> toDtoList (List<ClientEntity> clientEntities){
        List<ClientDTO> clientDTOS = new ArrayList();
        for (ClientEntity client : clientEntities){
            clientDTOS.add(new ClientDTO(client));
        }
        return clientDTOS;
    }
}
