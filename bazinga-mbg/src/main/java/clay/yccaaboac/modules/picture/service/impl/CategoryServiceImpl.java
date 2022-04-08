package clay.yccaaboac.modules.picture.service.impl;

import clay.yccaaboac.modules.picture.entity.Category;
import clay.yccaaboac.modules.picture.mapper.CategoryMapper;
import clay.yccaaboac.modules.picture.service.CategoryService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 图片分类 服务实现类
 * </p>
 *
 * @author Shelby
 * @since 2021-12-02
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements CategoryService {

}
