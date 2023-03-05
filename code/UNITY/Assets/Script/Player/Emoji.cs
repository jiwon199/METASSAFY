using Photon.Pun;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Emoji : MonoBehaviourPunCallbacks
{
#pragma warning disable
    public GameObject[] emojis = new GameObject[16];

    private int action;
    private float timer;

    GameObject me;

    void Start() {
       
        timer = 2.0f;
        action = 0;
        /*
        if (photonView != null)
        {
            //내가 로컬 플레이어일까?
            if (photonView.IsMine)
            {
                timer = 2.0f;
                action = 0;
            }
        }*/
    }

    // Update is called once per frame
    void Update()
    {
        // setEmoji();
        setEmoji(1);
        setEmoji(2);
        setEmoji(3);
        setEmoji(4);
        setEmoji(5);
        setEmoji(6);
        setEmoji(7);
        setEmoji(8);
        setEmoji(9);
        setEmoji(10);
        setEmoji(11);
        setEmoji(12);
        setEmoji(13);
        setEmoji(14);
        setEmoji(15);

    }

    private void setEmoji(int idx) {
        if (photonView.IsMine)
        {
            if (idx == 1)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha1))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);   
                }
 
            }
            else if (idx == 2)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha2)  )
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 3)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha3) )
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 4)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha4) )
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 5)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha5)  )
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 6)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha6)  )
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 7)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha7))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 8)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha8))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 9)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha9))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 10)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Alpha0))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 11)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Minus))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 12)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.Equals))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 13)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.R))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 14)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.E))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }
            else if (idx == 15)
            {
                if (action == 0 && Input.GetKeyDown(KeyCode.T))
                {
                    photonView.RPC("showEmoji", RpcTarget.All, idx);
                }
            }

            photonView.RPC("deleteEmoji", RpcTarget.All, idx);


        }
    }

    [PunRPC]
    void showEmoji(int idx)
    {

        emojis[idx].SetActive(true);
        action = idx;

         

    }
    [PunRPC]
    void deleteEmoji(int idx)
    {
        if (action != idx) return;

        if (action > 0)
        {


            timer -= Time.deltaTime;

            if (timer < 0)
            {
                action = 0;
                timer = 2.0f;
                emojis[idx].SetActive(false);
            }


        }
    }
  
     
}
