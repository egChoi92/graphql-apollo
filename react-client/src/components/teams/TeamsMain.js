import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import renderingHandler from "../../utils/renderingHandler";

const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      id
      manager
      office
      extension_number
      mascot
      cleaning_duty
      project
    }
  }
`;
const DELETE_TEAM = gql`
  mutation DeleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      id
    }
  }
`;
const EDIT_TEAM = gql`
  mutation EditTeam($id: ID!, $input: PostTeamInput!) {
    editTeam(id: $id, input: $input) {
      id
      manager
      office
      extension_number
      mascot
      cleaning_duty
      project
    }
  }
`;
const POST_TEAM = gql`
  mutation PostTeam($input: PostTeamInput!) {
    postTeam(input: $input) {
      id
      manager
      office
      extension_number
      mascot
      cleaning_duty
      project
    }
  }
`;

const TeamsMain = ({ contentId, setContentId, refetchTeam }) => {
  const initialInput = {
    manager: "",
    office: "",
    extension_number: "",
    mascot: "",
    cleaning_duty: "",
    project: "",
  };
  const [inputs, setInputs] = useState(initialInput);

  const { loading, error, refetch } = useQuery(GET_TEAM, {
    variables: { id: contentId },
    onCompleted: (data) => {
      if (contentId === 0) {
        setInputs(initialInput);
      } else {
        setInputs({
          manager: data.team.manager,
          office: data.team.office,
          extension_number: data.team.extension_number,
          mascot: data.team.mascot,
          cleaning_duty: data.team.cleaning_duty,
          project: data.team.project,
        });
      }
    },
    skip: true, // 초기 실행 건너뛰기
  });

  // 삭제하기
  const execDeleteTeam = () => {
    if (window.confirm("이 항목을 삭제하시겠습니까?")) {
      deleteTeam({ variables: { id: contentId } });
    }
  };
  const [deleteTeam] = useMutation(DELETE_TEAM, {
    onCompleted: (data) => {
      console.log(data.deleteTeam);
      alert(`${data.deleteTeam.id} 항목이 삭제되었습니다.`);
      setContentId(0);
      refetchTeam.current();
    },
  });

  // 수정하기
  const execEditTeam = () => {
    editTeam({ variables: { id: contentId, input: inputs } });
  };
  const [editTeam] = useMutation(EDIT_TEAM, {
    onCompleted: (data) => {
      console.log(data.editTeam);
      alert(`${data.editTeam.id} 항목이 수정되었습니다.`);
    },
  });

  // 생성하기
  const execPostTeam = () => {
    postTeam({ variables: { input: inputs } });
  };
  const [postTeam] = useMutation(POST_TEAM, {
    onCompleted: (data) => {
      console.log(data.postTeam);
      alert(`${data.postTeam.id} 항목이 등록되었습니다.`);
      setContentId();
      refetchTeam.current();
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    refetch({ id: contentId });
  }, [contentId, refetch]);

  return renderingHandler(
    () => {
      const {
        manager,
        office,
        extension_number,
        mascot,
        cleaning_duty,
        project,
      } = inputs;
      return (
        <div className="inputContainer">
          <table>
            <tbody>
              {contentId !== 0 && (
                <tr>
                  <td>ID</td>
                  <td>{contentId}</td>
                </tr>
              )}
              <tr>
                <td>Manager</td>
                <td>
                  <input
                    type="text"
                    name="manager"
                    value={manager}
                    onChange={handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Office</td>
                <td>
                  <input
                    type="text"
                    name="office"
                    value={office}
                    onChange={handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Extension Number</td>
                <td>
                  <input
                    type="text"
                    name="extension_number"
                    value={extension_number}
                    onChange={handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Mascot</td>
                <td>
                  <input
                    type="text"
                    name="mascot"
                    value={mascot}
                    onChange={handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Cleaning Duty</td>
                <td>
                  <input
                    type="text"
                    name="cleaning_duty"
                    value={cleaning_duty}
                    onChange={handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Project</td>
                <td>
                  <input
                    type="text"
                    name="project"
                    value={project}
                    onChange={handleChange}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            {contentId === 0 ? (
              <button onClick={execPostTeam}>Submit</button>
            ) : (
              <>
                <button onClick={execEditTeam}>Modify</button>
                <button onClick={execDeleteTeam}>Delete</button>
                <button onClick={() => setContentId(0)}>New</button>
              </>
            )}
          </div>
        </div>
      );
    },
    loading,
    error
  );
};

export default TeamsMain;
