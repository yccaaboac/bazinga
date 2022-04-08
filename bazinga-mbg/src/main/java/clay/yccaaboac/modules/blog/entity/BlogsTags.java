package clay.yccaaboac.modules.blog.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author Shelby
 * @since 2021-12-01
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("blog_blogs_tags")
public class BlogsTags implements Serializable {

    private static final long serialVersionUID=1L;

    @TableId(value = "blog_id", type = IdType.ASSIGN_ID)
    private Long blogId;

    private Long tagId;


}
