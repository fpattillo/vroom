interface ExerciseRequest {
  name?: string;
  type?: string;
  muscle?: string;
  difficulty?: string;
  offset?: number;
}

export async function getExercises(body: ExerciseRequest) {
  const headers = new Headers();
  headers.append("X-Api-Key", process.env.API_NINJAS_KEY ?? "");
  const response = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${body?.name}&type=${body?.type}&muscle=${body?.muscle}&difficulty=${body?.difficulty}&offset=${body?.offset}`, {
    headers: headers,
  });
  const data = await response.json();
  return data;
}