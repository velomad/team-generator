import React, { Component, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import Teams from "./components/Teams";
import Text from "./components/Text";
import {
  chennai,
  mumbai,
  bangalore,
  delhi,
  hyderabad,
  kolkata,
  punjab,
  rajasthan,
} from "./data/players";
import PlayersList from "./components/PlayersList";

const App = (props) => {
  const [team, setTeam] = useState({
    teamOneLabel: "",
    teamTwoLabel: "",
    teamOneName: "",
    teamTwoName: "",
  });

  const handleTeamSelection = () => {
    console.log(team);
  };

  return (
    <>
      <div className="text-center font-bold text-lg p-4 bg-red-600 text-white">
        Dream11 Team Generator
      </div>

      <div className="flex-column items-center justify-between p-4 space-y-4">
        <div className="text-center space-y-2">
          <div>
            <Text variant="primary">Team 1</Text>
          </div>
          <div>
            <Teams
              setTeamLabel={(teamLabel, teamName) =>
                setTeam({
                  ...team,
                  teamOneLabel: teamLabel,
                  teamOneName: teamName,
                })
              }
            />
          </div>
        </div>
        <div className=" inline-block flex justify-center">
          <Text classes="italic" weight="700" variant="danger">
            VS
          </Text>
        </div>
        <div className="text-center space-y-2 ">
          <div>
            <Text variant="primary">Team 2</Text>
          </div>
          <div>
            <Teams
              setTeamLabel={(teamLabel, teamName) =>
                setTeam({
                  ...team,
                  teamTwoLabel: teamLabel,
                  teamTwoName: teamName,
                })
              }
            />
          </div>
        </div>
      </div>

      {team.teamOneName !== "" && team.teamTwoName !== "" ? (
        <div className="py-6">
          <div>
            <div className="text-center p-2 bg-red-100">
              <Text variant="danger">{team.teamOneName}</Text>
            </div>
            <div className="px-4 py-2">
              <Text size="xs" variant="primary">
                Select Playing 11{" "}
              </Text>
            </div>
            <div className="px-4 py-2">
              {team.teamOneLabel !== "" && (
                <PlayersList
                  players={
                    team.teamOneLabel === "mumbai"
                      ? mumbai
                      : team.teamOneLabel === "delhi"
                      ? delhi
                      : team.teamOneLabel === "bangalore"
                      ? bangalore
                      : team.teamOneLabel === "rajasthan"
                      ? rajasthan
                      : team.teamOneLabel === "kolkata"
                      ? kolkata
                      : team.teamOneLabel === "chennai"
                      ? chennai
                      : team.teamOneLabel === "punjab"
                      ? punjab
                      : team.teamOneLabel === "hyderabad"
                      ? hyderabad
                      : null
                  }
                />
              )}
            </div>
          </div>
          <div>
            <div className="text-center p-2 bg-red-100">
              <Text variant="danger">{team.teamTwoName}</Text>
            </div>
            <div className="px-4 py-2">
              <Text size="xs" variant="primary">
                Select Playing 11{" "}
              </Text>
            </div>
            <div className="px-4 py-2">
              {team.teamOneLabel !== "" && (
                <PlayersList
                  players={
                    team.teamTwoLabel === "mumbai"
                      ? mumbai
                      : team.teamTwoLabel === "delhi"
                      ? delhi
                      : team.teamTwoLabel === "bangalore"
                      ? bangalore
                      : team.teamTwoLabel === "rajasthan"
                      ? rajasthan
                      : team.teamTwoLabel === "kolkata"
                      ? kolkata
                      : team.teamTwoLabel === "chennai"
                      ? chennai
                      : team.teamTwoLabel === "punjab"
                      ? punjab
                      : team.teamTwoLabel === "hyderabad"
                      ? hyderabad
                      : null
                  }
                />
              )}
            </div>
          </div>
          <div className="p-2">
            <button
              onClick={handleTeamSelection}
              className="focus:outline-none text-white bg-red-500 w-full p-2"
            >
              <Text>Generate Team</Text>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default App;
