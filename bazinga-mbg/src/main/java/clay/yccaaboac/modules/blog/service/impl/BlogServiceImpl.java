package clay.yccaaboac.modules.blog.service.impl;

import clay.yccaaboac.modules.blog.entity.Blog;
import clay.yccaaboac.modules.blog.mapper.BlogMapper;
import clay.yccaaboac.modules.blog.service.BlogService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 博客 服务实现类
 * </p>
 *
 * @author Shelby
 * @since 2021-12-01
 */
@Service
public class BlogServiceImpl extends ServiceImpl<BlogMapper, Blog> implements BlogService {

}
