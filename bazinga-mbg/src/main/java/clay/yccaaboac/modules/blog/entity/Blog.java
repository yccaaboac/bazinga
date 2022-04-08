package clay.yccaaboac.modules.blog.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 博客
 * </p>
 *
 * @author Shelby
 * @since 2021-12-01
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("blog_blog")
public class Blog implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * ID
     */
    @TableId(value = "blog_id", type = IdType.AUTO)
    private Long blogId;

    /**
     * 博客标题
     */
    private String title;

    /**
     * 博客简介
     */
    private String summary;

    /**
     * 作者
     */
    private String author;

    /**
     * 博客分类
     */
    private Long categoryId;

    /**
     * 标题图片
     */
    private String fileId;

    /**
     * 博客点击数
     */
    private Integer clickCount;

    /**
     * 是否原创：0不是、1是
     */
    private String isOriginal;

    /**
     * 是否发布：0否、1是
     */
    private String isPublish;

    /**
     * 博客内容
     */
    private String content;

    /**
     * 创建者
     */
    private String createBy;

    /**
     * 更新着
     */
    private String updateBy;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 标题图片
     */
    private String titlePicture;

    /**
     * 文章出处
     */
    private String articleSource;

    /**
     * 博客评论数
     */
    private Integer commentCount;

    /**
     * 是否开启评论
     */
    private String openComment;


}
