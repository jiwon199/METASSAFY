using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;

public class GameManager : MonoBehaviour
{
    public static GameManager instance = null;
    public bool isConnect = false;
    public Transform[] spawnPoints;

    private void Awake()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(this.gameObject);
        }
        else if (instance != this) 
        {
            //Destroy(this.gameObject);
        }
    }

    // Start is called before the first frame update
    void Start()
    {

        StartCoroutine(CreatePlayer());    
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    IEnumerator CreatePlayer()
    {
        yield return new WaitUntil(() => isConnect);

        GameObject playerTemp = PhotonNetwork.Instantiate("Player", Vector3.zero, Quaternion.identity, 0);

    }


}
