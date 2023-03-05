using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Cinemachine;
using Photon.Pun;

public class CopyPosition : MonoBehaviourPunCallbacks
{
    [SerializeField]
    private bool x, y, z;

    private Transform target;

   
    public override void OnJoinedRoom()
    {
        GameObject[] players = GameObject.FindGameObjectsWithTag("Player");
        for (int i = 0; i < players.Length; i++)
        {    //�̵��� ��(=�ڱ� �ڽ�)�� ��Ʈ��ũ���� ���� 
            if (players[i].GetComponent<PhotonView>().IsMine)
            {
                target = players[i].transform;
            }
        }
    }

    // Update is called once per frame
    private void Update()
    {
        // �i�ư� ����� ������ ����
        if (!target) return;

        transform.position = new Vector3(
            (x ? target.position.x : transform.position.x),
            (y ? target.position.y : transform.position.y),
            (z ? target.position.z : transform.position.z));
    }
}
