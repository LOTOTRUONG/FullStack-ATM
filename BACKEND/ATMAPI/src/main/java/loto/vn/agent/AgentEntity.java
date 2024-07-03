package loto.vn.agent;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "agent")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AgentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agent")
    private Integer idAgent;

    @Basic
    @Column(name = "last_name")
    private String lastnameAgent;

    @Basic
    @Column(name = "first_name")
    private String firstnameAgent;

}
