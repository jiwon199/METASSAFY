using Photon.Pun;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UIElements;

public class respawn : MonoBehaviourPun
{
    Boolean dead = false;
    // Start is called before the first frame update
    void Start()
    {
        
    }
    public GameObject map;
    // Update is called once per frame

    void Update()
    {

    }

    private void OnTriggerEnter(Collider other)

    {
        if (other.gameObject.tag == "Player")
        {
            Debug.Log(other.name + "데드존에 닿았음!");
            dead = true;
            Debug.Log(dead);
            
        }
        if (dead == true)
        {
            Debug.Log("이동!!");
            //transform.position = Vector3.MoveTowards(transform.position, target, 0.1f);
            sceneReroad();
            dead = false;
        }


    }

    void sceneReroad()
    {
        
        //모든 플레이어 중에서
        GameObject[] players = GameObject.FindGameObjectsWithTag("Player");
        for (int i = 0; i < players.Length; i++)
        {    //이동한 애(=자기 자신)을 네트워크에서 끊기
            if (players[i].GetComponent<PhotonView>().IsMine)
            {
                PhotonNetwork.Disconnect();
            }
        }
        //씬 이동
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }







}
