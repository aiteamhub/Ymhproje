package com.healthylife.repository;

import com.healthylife.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByCategoryOrderByPublishedAtDesc(String category);
    List<Article> findByTagsContainingOrderByPublishedAtDesc(String tag);
    List<Article> findTop10ByOrderByPublishedAtDesc();
} 