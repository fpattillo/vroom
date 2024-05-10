"use client";
import { useEffect, useState } from "react"
import { getExercises } from "../../fetch/exercises";
import { Selector } from "../../components/Exercises/selector";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";

interface Exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

const exerciseData: Exercise[] = [
  {
    "name": "Rickshaw Carry",
    "type": "strongman",
    "muscle": "forearms",
    "equipment": "other",
    "difficulty": "beginner",
    "instructions": "Position the frame at the starting point, and load with the appropriate weight. Standing in the center of the frame, begin by gripping the handles and driving through your heels to lift the frame. Ensure your chest and head are up and your back is straight. Immediately begin walking briskly with quick, controlled steps. Keep your chest up and head forward, and make sure you continue breathing. Bring the frame to the ground after you have reached the end point."
  },
  {
    "name": "Single-Leg Press",
    "type": "strength",
    "muscle": "quadriceps",
    "equipment": "machine",
    "difficulty": "intermediate",
    "instructions": "Load the sled to an appropriate weight. Seat yourself on the machine, planting one foot on the platform in line with your hip. Your free foot can be placed on the ground. Maintain good spinal position with your head and chest up. Supporting the weight, fully extend the knee and unlock the sled. This will be your starting position. Lower the weight by flexing the hip and knee, continuing as far as flexibility allows. Do not allow your lumbar to take the load by moving your pelvis. At the bottom of the motion pause briefly and then return to the starting position by extending the hip and knee. Complete all repetitions for one leg before switching to the other."
  },
  {
    "name": "Landmine twist",
    "type": "strength",
    "muscle": "abdominals",
    "equipment": "other",
    "difficulty": "intermediate",
    "instructions": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to shoulder height with both hands with your arms extended in front of you. Adopt a wide stance. This will be your starting position. Perform the movement by rotating the trunk and hips as you swing the weight all the way down to one side. Keep your arms extended throughout the exercise. Reverse the motion to swing the weight all the way to the opposite side. Continue alternating the movement until the set is complete."
  },
  {
    "name": "Weighted pull-up",
    "type": "strength",
    "muscle": "lats",
    "equipment": "other",
    "difficulty": "intermediate",
    "instructions": "Attach a weight to a dip belt and secure it around your waist. Grab the pull-up bar with the palms of your hands facing forward. For a medium grip, your hands should be spaced at shoulder width. Both arms should be extended in front of you holding the bar at the chosen grip. You'll want to bring your torso back about 30 degrees while creating a curvature in your lower back and sticking your chest out. This will be your starting position. Now, exhale and pull your torso up until your head is above your hands. Concentrate on squeezing your shoulder blades back and down as you reach the top contracted position. After a brief moment at the top contracted position, inhale and slowly lower your torso back to the starting position with your arms extended and your lats fully stretched."
  },
  {
    "name": "T-Bar Row with Handle",
    "type": "strength",
    "muscle": "middle_back",
    "equipment": "other",
    "difficulty": "intermediate",
    "instructions": "Position a bar into a landmine or in a corner to keep it from moving. Load an appropriate weight onto your end. Stand over the bar, and position a Double D row handle around the bar next to the collar. Using your hips and legs, rise to a standing position. Assume a wide stance with your hips back and your chest up. Your arms should be extended. This will be your starting position. Pull the weight to your upper abdomen by retracting the shoulder blades and flexing the elbows. Do not jerk the weight or cheat during the movement. After a brief pause, return to the starting position."
  },
]

export default function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [muscle, setMuscle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [filtersLoading, setFiltersLoading] = useState<boolean>(false);

  const filters: {[key: string]: string | number} = {name: name, type: type, muscle: muscle, difficulty: difficulty, offset: offset};

  const fetchExercises = async () => {
    if (process.env.NODE_ENV === "development") {
      setExercises(exerciseData);
      return;
    } else {
      const data = await getExercises({ name, type, muscle, difficulty, offset });
      setExercises(data);
    }
  }

  useEffect(() => {
    fetchExercises();
  }, []);
  
  return (
    <>
      <h1 className="mb-8">Exercises</h1>
      <div className="flex justify-between gap-3 p-3 items-center">
        {Object.keys(filters).map((filterKey: string, index) => (
          <Selector placeholder={filterKey} value={filters[filterKey]} key={'filter-select-' + index}/>
        ))}
        <Button variant='outline' disabled={filtersLoading}>
          {filtersLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /><span>Loading...</span></> : 'Apply'}
        </Button>
      </div>
      {exercises.map((exercise, index) => (
        <div className="max-w-full p-4 border border-solid mb-4 rounded-lg shadow-md" key={index}>
          <h2 className="mb-3">{exercise.name}</h2>
          <p><strong>Type: </strong>{exercise.type}</p>
          <p><strong>Muscle: </strong>{exercise.muscle}</p>
          <p><strong>Equipment: </strong>{exercise.equipment}</p>
          <p><strong>Difficulty: </strong>{exercise.difficulty}</p>
          <p className="text-ellipsis whitespace-nowrap overflow-hidden"><strong>Instructions: </strong>{exercise.instructions}</p>
        </div>
      ))}
    </>
  )
}