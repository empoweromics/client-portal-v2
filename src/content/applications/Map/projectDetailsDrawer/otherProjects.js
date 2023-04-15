/* eslint-disable jsx-a11y/no-static-element-interactions */
import styles from './projectDrawer.module.css';

const OtherProjects = ({ projectDetails, getProject }) => {
  return (
    <div className={styles.other_projects_wrapper}>
      <div className={styles.other_projects_header}>
        Other projects by {projectDetails.project?.developer_name}{' '}
      </div>
      {projectDetails?.developer_projects?.map((project) => {
        return (
          <div
            key={project._id}
            onClick={() => getProject(project._id)}
            onKeyDown={() => {console.log('clicked');}}
          >
            <img
              className={styles.other_projects_img}
              src={`https://empoweromics.com/app/pl/${project?.logo}`}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

export { OtherProjects };
