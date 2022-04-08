package clay.yccaaboac.modules.system.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 角色部门关联
 * </p>
 *
 * @author Shelby
 * @since 2021-12-02
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("sys_roles_depts")
public class RolesDepts implements Serializable {

    private static final long serialVersionUID=1L;

    @TableId(value = "role_id", type = IdType.ASSIGN_ID)
    private Long roleId;

    private Long deptId;


}
