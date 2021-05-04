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
import _, { sample } from "lodash";

const App = (props) => {
  let filtredTeam = [];
  let filtredTeamOne = [];
  let filtredTeamTwo = [];

  const [team, setTeam] = useState({
    teamOneLabel: "",
    teamTwoLabel: "",
    teamOneName: "",
    teamTwoName: "",
  });
  const [t, st] = useState([]);
  const [o, so] = useState([]);
  const [teamsMerged, setTeamsMerged] = useState([]);

  const handleGenerateTeam = () => {
    generateRawDataForTeam();
  };

  useEffect(() => {
    let ary = [];
    for (let [key, value] of t.entries()) {
      if (value === true) {
        ary.push(key);
      }
    }
    for (let [key, value] of o.entries()) {
      if (value === true) {
        ary.push(key);
      }
    }

    let teamOneData = [];
    let teamSecondData = [];
    var firstTeam = t.entries();
    var secondTeam = o.entries();

    for (let x of firstTeam) {
      if (x[1]) {
        teamOneData.push({ 'playername': x[0].split('-')[0], 'playerteam': x[0].split('-')[1], 'ischecked': x[1], 'playerrole': x[0].split('-')[2].replaceAll(' ', '_') });
      }
    }
    for (let x of secondTeam) {
      if (x[1]) {
        teamSecondData.push({ 'playername': x[0].split('-')[0], 'playerteam': x[0].split('-')[1], 'ischecked': x[1], 'playerrole': x[0].split('-')[2].replaceAll(' ', '_') });
      }
    }
    setTeamsMerged([...teamOneData, ...teamSecondData]);
  }, [t, o]);

  const generateRawDataForTeam = () => {
    let groupBy_PlayerTeam = _.groupBy(teamsMerged, 'playerteam');
    let groupBy_PlayerRole_teamOne;
    let groupBy_PlayerRole_teamTwo;
    Object.keys(groupBy_PlayerTeam).map((el, index) => {
      if (index == 0) {
        groupBy_PlayerRole_teamOne = _.groupBy(groupBy_PlayerTeam[el], 'playerrole');
        generateTeam(groupBy_PlayerRole_teamOne, 1, el);
      } else {
        groupBy_PlayerRole_teamTwo = _.groupBy(groupBy_PlayerTeam[el], 'playerrole');
        generateTeam(groupBy_PlayerRole_teamTwo, 2, el);
      }
    });
  }

  const generateTeam = (groupBy_PlayerTeam, val, team) => {
    let wicket_keeper = _.random(1, groupBy_PlayerTeam.Wicket_Keeper.length < 4 ? groupBy_PlayerTeam.Wicket_Keeper.length : 4);

    let batsman = _.random(3, groupBy_PlayerTeam.Batsman.length < 6 ? groupBy_PlayerTeam.Batsman.length : 6);
    let all_rounder = _.random(1, groupBy_PlayerTeam.All.length < 4 ? groupBy_PlayerTeam.All.length : 4);
    let bowler = _.random(3, groupBy_PlayerTeam.Bowler.length < 6 ? groupBy_PlayerTeam.Bowler.length : 6);

    for (let wicket_keeper_i = 0; wicket_keeper_i < wicket_keeper; wicket_keeper_i++) {
      filtredTeam.push(groupBy_PlayerTeam.Wicket_Keeper[wicket_keeper_i]);
    }
    for (let batsman_i = 0; batsman_i < batsman; batsman_i++) {
      filtredTeam.push(groupBy_PlayerTeam.Batsman[batsman_i]);
    }
    for (let all_rounder_i = 0; all_rounder_i < all_rounder; all_rounder_i++) {
      filtredTeam.push(groupBy_PlayerTeam.All[all_rounder_i]);
    }
    for (let bowler_i = 0; bowler_i < bowler; bowler_i++) {
      filtredTeam.push(groupBy_PlayerTeam.Bowler[bowler_i]);
    }
    let dummyArry = [];
    if (val == 1 && filtredTeam.length > 7) {
      let selectRandomPlayers = _.random(6, 7);
      for (let i = 0; i < selectRandomPlayers; i++) {
        dummyArry.push(filtredTeam[i]);
      }
      filtredTeam.length = 0;
      filtredTeamOne = [...dummyArry];
    }
    let dummyArry_two = [];
    if (val == 2) {
      let groupBy_Team = _.groupBy(filtredTeam, 'playerteam');
      if (groupBy_Team[team].length > 9) {
        let selectRandomPlayers = 10;
        for (let i = 0; i < selectRandomPlayers; i++) {
          dummyArry_two.push(groupBy_Team[team][i]);
        }
        console.log('dummyArry_two----<', dummyArry_two);
        filtredTeamTwo = [...dummyArry_two];
        let totalData = [...filtredTeamOne, ...filtredTeamTwo];
        let forceGroup = _.groupBy(totalData, 'playerrole');
        generatePlaying11(forceGroup);
      } else {
        let selectRandomPlayers = _.random(5, 6);
        for (let i = 0; i < selectRandomPlayers; i++) {
          dummyArry_two.push(groupBy_Team[team][i]);
        }
        console.log('dummyArry_two----<', dummyArry_two);
        filtredTeamTwo = [...dummyArry_two];
        let totalData = [...filtredTeamOne, ...filtredTeamTwo];
        let forceGroup = _.groupBy(totalData, 'playerrole');
        generatePlaying11(forceGroup);
      }
    }
  }

  const generatePlaying11 = (data) => {
    let FinalPlaying11 = [];
    let wicket_keeper = _.random(1, data.Wicket_Keeper.length < 4 ? data.Wicket_Keeper.length : 4);

    let batsman = _.random(3, data.Batsman.length < 6 ? data.Batsman.length : 6);
    let all_rounder = _.random(1, data.All.length < 4 ? data.All.length : 4);
    let bowler = _.random(3, data.Bowler.length < 6 ? data.Bowler.length : 6);

    for (let wicket_keeper_i = 0; wicket_keeper_i < wicket_keeper; wicket_keeper_i++) {
      FinalPlaying11.push(data.Wicket_Keeper[wicket_keeper_i]);
    }
    for (let batsman_i = 0; batsman_i < batsman; batsman_i++) {
      FinalPlaying11.push(data.Batsman[batsman_i]);
    }
    for (let all_rounder_i = 0; all_rounder_i < all_rounder; all_rounder_i++) {
      FinalPlaying11.push(data.All[all_rounder_i]);
    }
    for (let bowler_i = 0; bowler_i < bowler; bowler_i++) {
      FinalPlaying11.push(data.Bowler[bowler_i]);
    }

    let groupFinalTeam = _.groupBy(FinalPlaying11, 'playerteam');
    console.log('groupFinalTeam', groupFinalTeam);
    console.log('FinalPlaying11', FinalPlaying11);
    let calculateFinalTeam = _.groupBy(FinalPlaying11, 'playerrole');
    if (FinalPlaying11.length > 11) {
      let dummyData = [];
      Object.keys(calculateFinalTeam).map((el, index) => {
        dummyData.push({ 'category': el, maxlength: calculateFinalTeam[el].length });
      });
      console.log('dummyData', dummyData);
      var dataset = dummyData,
        max = -Infinity,
        key;

      dataset.forEach(function (v, k) {
        if (max < +v.maxlength) {
          max = +v.maxlength;
          key = k;
        }
      });
      console.log(dataset[key]);
      let callength = FinalPlaying11.length - 11;
      Object.keys(calculateFinalTeam).map((el, index) => {
        if (dataset[key].category == el) {
          calculateFinalTeam[el].splice(0, callength);
        }
      });
    }
    let dArr = [];
    dArr = [...calculateFinalTeam.All, ...calculateFinalTeam.Batsman, ...calculateFinalTeam.Bowler, ...calculateFinalTeam.Wicket_Keeper];
    console.log('Final data', dArr);
    console.log('wicket_keeper', wicket_keeper);
    console.log('batsman', batsman);
    console.log('all_rounder', all_rounder);
    console.log('bowler', bowler);
    filtredTeam.length = 0;
    filtredTeamOne.length = 0;
    filtredTeamTwo.length = 0;
  }
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
                  setItems={(one) => st(one)}
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
                  setItems={(z) => so(z)}
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
              onClick={handleGenerateTeam}
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
