import React, { Component } from 'react';
import { debounce } from 'lodash/fp';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../components/Layout';
import Card from '../../components/Card';

import { Container, BgImage, Title, SubTitle, SearchContainer, Search, SearchIcon } from './styles';
import {
  ProjectsContainer,
  ProjectsList,
  ProjectsHeader,
  ProjectsCount,
  Loader,
  LoaderWrapper,
} from './styles/Projects';

class Projects extends Component {
  state = {
    search: '',
  };

  debouncedProjectsFetch = debounce(750, () => {
    this.props.getProjects({ search: this.state.search });
  });

  componentDidMount() {
    this.props.getProjects({ search: this.state.search });
  }

  handleSearch = (e) => {
    const value = e.target.value;

    this.setState({ search: value }, this.debouncedProjectsFetch);
  };

  render() {
    const { isLoading, projects, t } = this.props;
    return (
      <Layout>
        <Container>
          <BgImage>
            <Title>{t('Projects.pageTitle')}</Title>
            <SubTitle>{t('Projects.pageSubTitle')}</SubTitle>
            <SearchContainer>
              <SearchIcon>
                <FontAwesomeIcon icon="search" />
              </SearchIcon>
              <Search
                type="text"
                placeholder={t('Projects.projectsSearchPlaceholder')}
                value={this.state.search}
                onChange={this.handleSearch}
              />
            </SearchContainer>
          </BgImage>
          <ProjectsContainer>
            <ProjectsHeader>
              <ProjectsCount>
                {t('Projects.allJobsAmount', { amount: projects.length })}
              </ProjectsCount>
            </ProjectsHeader>
            <ProjectsList spaceAround={projects.length === 2}>
              {projects.map((project) => (
                <Card {...project} key={project.id} />
              ))}
            </ProjectsList>
            {isLoading && (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}
          </ProjectsContainer>
        </Container>
      </Layout>
    );
  }
}

Projects.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  getProjects: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Projects;
