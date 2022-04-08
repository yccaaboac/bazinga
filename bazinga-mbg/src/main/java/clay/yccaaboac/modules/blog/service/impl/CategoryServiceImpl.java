package clay.yccaaboac.modules.blog.service.impl;

import clay.yccaaboac.modules.blog.entity.Category;
import clay.yccaaboac.modules.blog.mapper.CategoryMapper;
import clay.yccaaboac.modules.blog.service.CategoryService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 博客分类 服务实现类
 * </p>
 *
 * @author Shelby
 * @since 2021-12-01
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements CategoryService {

}
